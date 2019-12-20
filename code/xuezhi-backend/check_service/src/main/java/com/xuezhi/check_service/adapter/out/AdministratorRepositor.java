package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Administrator;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdministratorRepositor extends MongoRepository<Administrator, String> {
    Administrator findAdministratorByNameAndPassword(String name, String password);
}
