package com.xuezhi.endpoint.Dao;

import com.xuezhi.endpoint.Entity.User;



public interface UserDao {
    public boolean login(String email, String password);
    //public boolean editPassword(String password);
    public User findByEmail(String email);
    //public User findByEmailAndPassword(String email, String password);
    public User addUser(String email, String password);
}
