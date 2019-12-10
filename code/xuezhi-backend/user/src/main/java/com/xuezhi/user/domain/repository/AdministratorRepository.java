package com.xuezhi.user.domain.repository;

import com.xuezhi.user.domain.entity.Administrator;

public interface AdministratorRepository {
    Administrator getAdministratorById(String id);
    Administrator getAdministratorByNameAndPassword(String name, String password);
}
