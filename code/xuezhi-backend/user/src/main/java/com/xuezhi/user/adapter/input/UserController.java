package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import com.xuezhi.user.domain.entity.User;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Api("用户api")
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

    @PutMapping("/user/information")
    public boolean updateUser(@RequestParam String id, @RequestParam String name, @RequestParam int age, @RequestParam String sex, @RequestParam String signature){
        //TODO
        usersApplication.updateUser(id, name, age, sex, signature);
        return true;
    }


}
