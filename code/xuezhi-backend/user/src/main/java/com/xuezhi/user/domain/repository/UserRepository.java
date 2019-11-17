package com.xuezhi.user.domain.repository;

import com.xuezhi.user.domain.entity.User;

public interface UserRepository {
    void addUser(String email, String password);

    void updateUser(String id, String name, int age, String sex, String signature);

    User getUserById(String id);

    User getUserByEmailAndPassword(String email, String password);

    User getUserByEmail(String email);

}
