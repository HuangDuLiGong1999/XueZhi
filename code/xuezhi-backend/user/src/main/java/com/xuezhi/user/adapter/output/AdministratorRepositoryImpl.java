package com.xuezhi.user.adapter.output;

import com.xuezhi.user.domain.entity.Administrator;
import com.xuezhi.user.domain.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public class AdministratorRepositoryImpl implements AdministratorRepository {
    @Autowired
    private AdministratorRepositor administratorRepositor;

    @Override
    public Administrator getAdministratorById(String id){
        return administratorRepositor.findAdministratorById(id);
    }

    @Override
    public Administrator getAdministratorByNameAndPassword(String name, String password){
        return administratorRepositor.findAdministratorByNameAndPassword(name, password);
    }
}
