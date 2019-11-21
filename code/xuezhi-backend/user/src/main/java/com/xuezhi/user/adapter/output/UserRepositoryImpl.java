package com.xuezhi.user.adapter.output;

import com.xuezhi.user.adapter.output.UserRepositor;
import com.xuezhi.user.domain.entity.User;
import com.xuezhi.user.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private UserRepositor userRepositor;

    @Override
    public void addUser(String email, String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName("");
        user.setSex("");
        user.setTelephone("");
        user.setUniversity("");
        user.setSignature("");
        userRepositor.save(user);
    }

    @Override
    public User getUserById(String id){
        return userRepositor.findUserById(id);
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password){
        return userRepositor.findUserByEmailAndPassword(email, password);
    }

    @Override
    public void updateUser(String id, String name, int age, String sex, String signature){
        //todo
        User user = userRepositor.findUserById(id);
        user.setName(name);
        user.setAge(age);
        user.setSex(sex);
        user.setSignature(signature);
        userRepositor.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepositor.findByEmail(email);
    }

    @Override
    public void setAvatar(String id){
        User user = userRepositor.findUserById(id);
        //todo

        userRepositor.save(user);
    }

    @Override
    public void modifyPassword(String id, String password){
        User user = userRepositor.findUserById(id);
        user.setPassword(password);
        userRepositor.save(user);
    }
}
