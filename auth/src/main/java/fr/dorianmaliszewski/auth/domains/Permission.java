package fr.dorianmaliszewski.auth.domains;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Permission extends BaseIdEntity {
    private String name;
}
