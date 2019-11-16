package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import com.xuezhi.user.domain.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UsersApplication usersApplication;

    @Autowired
    public UserController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }

    @PostMapping("/user")
    public boolean addUser(@RequestParam String email, @RequestParam String password){
        usersApplication.addUser(email,password);
        return true;
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") String id){
        return usersApplication.getUserById(id);
    }

    @PatchMapping("/user/{id}")
    public boolean updateUser(@PathVariable("id") String id){
        //TODO
        usersApplication.updateUser(id);
        return true;
    }


}
