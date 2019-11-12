package fr.dorianmaliszewski.auth.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
public class User extends BaseIdEntity implements UserDetails {

    private String username;
    @JsonIgnore
    private String password;
    private String name;
    private String email;
    private Boolean enabled;
    private Boolean accountExpired;
    private Boolean accountLocked;
    private Boolean credentialsExpired;

    @ManyToMany()
    @JoinTable(name = "permission_user",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id") },
            inverseJoinColumns = {@JoinColumn(name = "permission_id", referencedColumnName = "id") })
    private List<Permission> permissions = new ArrayList<>();

    @ManyToOne(targetEntity = Role.class)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (role != null)
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        permissions.forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission.getName())));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !accountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !credentialsExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
