package com.xuezhi.endpoint.Service;

import com.xuezhi.endpoint.Dao.UserDao;
import com.xuezhi.endpoint.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public boolean login(String email, String password){

        return userDao.login(email, password);
    }

    @Override
    public User findByEmail(String email){
        return userDao.findByEmail(email);
    }

    @Override
    public User addUser(String email, String password){
        return userDao.addUser(email, password);
    }

}
