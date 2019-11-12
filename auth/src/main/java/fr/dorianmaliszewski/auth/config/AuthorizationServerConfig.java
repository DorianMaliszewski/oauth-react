package fr.dorianmaliszewski.auth.config;

import fr.dorianmaliszewski.auth.domains.User;
import fr.dorianmaliszewski.auth.services.impl.UserDetailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2RequestFactory;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    private final DataSource dataSource;
    private final AuthenticationManager authenticationManager;
    private final UserDetailServiceImpl userDetailService;
    private final ClientDetailsService clientDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AuthorizationServerConfig(DataSource dataSource, AuthenticationManager authenticationManager, UserDetailServiceImpl userDetailService, ClientDetailsService clientDetailsService, PasswordEncoder passwordEncoder) {
        this.dataSource = dataSource;
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
        this.clientDetailsService = clientDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(accessTokenConverter(), customTokenEnhancer()));
        endpoints
                .tokenEnhancer(tokenEnhancerChain)
                .tokenStore(tokenStore())
                .requestFactory(requestFactory())
                .authenticationManager(authenticationManager)
                .userDetailsService(userDetailService);
    }


    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.jdbc(dataSource).passwordEncoder(this.passwordEncoder);
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
        accessTokenConverter.setSigningKey("OK");
        return accessTokenConverter;
    }

    @Bean
    public OAuth2RequestFactory requestFactory() {
        DefaultOAuth2RequestFactory requestFactory = new DefaultOAuth2RequestFactory(clientDetailsService);
        requestFactory.setCheckUserScopes(true);
        return requestFactory;
    }

    @Bean
    public TokenEnhancer customTokenEnhancer() {return new CustomTokenEnhancer();}


    public class CustomTokenEnhancer implements TokenEnhancer {

        @Override
        public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
            User user = (User) oAuth2Authentication.getPrincipal();
            Map<String, Object> info = new LinkedHashMap<>(oAuth2AccessToken.getAdditionalInformation());

            info.put("user", user);

            DefaultOAuth2AccessToken customAccessToken = new DefaultOAuth2AccessToken(oAuth2AccessToken);
            customAccessToken.setAdditionalInformation(info);
            return customAccessToken;
        }
    }
}
