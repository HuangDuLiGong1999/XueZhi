package com.xuezhi.endpoint.Service;

import com.xuezhi.endpoint.Entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean login(String email, String password);
    //public boolean editPassword(String password);
    public User findByEmail(String email);
    public User addUser(String email, String password);
}
