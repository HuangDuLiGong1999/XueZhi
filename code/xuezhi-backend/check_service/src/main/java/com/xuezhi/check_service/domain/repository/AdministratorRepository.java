package com.xuezhi.check_service.domain.repository;

import com.xuezhi.check_service.domain.entity.Administrator;

public interface AdministratorRepository {
    Administrator getAdministrator(String name, String password);
}
