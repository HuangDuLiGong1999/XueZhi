package com.xuezhi.user.adapter.output;

import com.xuezhi.user.domain.entity.Administrator;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdministratorRepositor extends MongoRepository<Administrator, String> {
    Administrator findAdministratorById(String id);

    Administrator findAdministratorByNameAndPassword(String name, String password);
}
