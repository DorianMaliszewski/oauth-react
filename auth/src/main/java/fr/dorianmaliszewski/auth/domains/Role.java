package fr.dorianmaliszewski.auth.domains;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Role {
    @Id
    private Long id;
    private String name;
}
