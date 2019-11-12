package com.xuezhi.endpoint.Controller;

import com.xuezhi.endpoint.Entity.User;
import com.xuezhi.endpoint.Repository.UserRepository;
import com.xuezhi.endpoint.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping(value="/{email}")
    public User getUserByEmail(@PathVariable("email") String email){
        return userService.findByEmail(email);
    }

}
