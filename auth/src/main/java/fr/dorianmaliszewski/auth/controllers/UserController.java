package fr.dorianmaliszewski.auth.controllers;

import fr.dorianmaliszewski.auth.domains.User;
import fr.dorianmaliszewski.auth.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public List<User> findAll() {
        return this.userRepository.findAll();
    }



    @GetMapping("/me")
    public ResponseEntity findMe(OAuth2Authentication oAuth2Authentication) {
        return ResponseEntity.ok(this.userRepository.findByUsername(oAuth2Authentication.getName()));
    }
}
