package com.xuezhi.user.application;

import com.xuezhi.user.domain.entity.Administrator;
import com.xuezhi.user.domain.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdministratorApplication {
    private AdministratorRepository administratorRepository;

    @Autowired
    public AdministratorApplication(AdministratorRepository administratorRepository){
        this.administratorRepository = administratorRepository;
    }

    public Administrator getAdministratorById(String id){
        return administratorRepository.getAdministratorById(id);
    }

    public Administrator getAdministratorByNameAndPassword(String name, String password){
        return administratorRepository.getAdministratorByNameAndPassword(name, password);
    }
}
