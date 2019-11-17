package com.xuezhi.endpoint.Dao;

import com.xuezhi.endpoint.Entity.User;
import com.xuezhi.endpoint.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public boolean login(String email, String password){
        /*
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }
        if (user.getPassword().equals(password)){
            return true;
        }
        else{
            return false;
        }

         */

        return !(userRepository.findByEmailAndPassword(email, password) == null);
    }

    @Override
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public User addUser(String email, String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName("");
        user.setSex("");
        user.setTelephone("");
        user.setUniversity("");
        user.setSignature("");
        mongoTemplate.save(user);
        return user;
    }
}
