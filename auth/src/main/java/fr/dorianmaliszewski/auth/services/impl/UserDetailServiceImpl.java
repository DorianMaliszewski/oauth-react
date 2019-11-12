package fr.dorianmaliszewski.auth.services.impl;

import fr.dorianmaliszewski.auth.domains.User;
import fr.dorianmaliszewski.auth.repositories.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(s);
        if (user != null) {
            new AccountStatusUserDetailsChecker().check(user);
            return user;
        } else {
            throw new UsernameNotFoundException("User not found");
        }

    }
}
