package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Administrator;
import com.xuezhi.check_service.domain.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public class AdministratorRepositoryImpl implements AdministratorRepository {
    @Autowired
    private AdministratorRepositor administratorRepositor;

    public Administrator getAdministrator(String name, String password){
        return administratorRepositor.findAdministratorByNameAndPassword(name, password);
    }
}
