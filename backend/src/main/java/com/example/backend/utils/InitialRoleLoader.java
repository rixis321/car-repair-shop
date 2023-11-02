package com.example.backend.utils;

import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitialRoleLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;

    public InitialRoleLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(!roleRepository.existsByName("ADMIN")){
            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            roleRepository.save(adminRole);
        }
        if(!roleRepository.existsByName("RECEPCJONISTA")){
            Role recepctionisRole = new Role();
            recepctionisRole.setName("RECEPCJONISTA");
            roleRepository.save(recepctionisRole);
        }
        if(!roleRepository.existsByName("MECHANIK")){
            Role mechanicRole = new Role();
            mechanicRole.setName("MECHANIK");
            roleRepository.save(mechanicRole);
        }
    }
}
