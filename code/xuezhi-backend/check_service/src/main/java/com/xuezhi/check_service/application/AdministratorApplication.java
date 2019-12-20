package com.xuezhi.check_service.application;

import com.xuezhi.check_service.domain.entity.Administrator;
import com.xuezhi.check_service.domain.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdministratorApplication {
    private AdministratorRepository administratorRepository;

    @Autowired
    public AdministratorApplication(AdministratorRepository administratorRepository){
        this.administratorRepository = administratorRepository;
    }

    public Administrator getAdministrator(String name, String password){
        return administratorRepository.getAdministrator(name, password);
    }
}
