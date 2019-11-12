package fr.dorianmaliszewski.auth.repositories;

import fr.dorianmaliszewski.auth.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("Select u from User u left join fetch u.permissions where u.username = :username")
    User findByUsername(String username);
}
