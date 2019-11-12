package com.xuezhi.endpoint.Dao;

import com.xuezhi.endpoint.Entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {
    public boolean login(String email, String password);
    //public boolean editPassword(String password);
    public User findByEmail(String email);
}
