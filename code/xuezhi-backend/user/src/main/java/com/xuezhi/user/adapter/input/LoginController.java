package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import com.xuezhi.user.domain.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(value="/login")
public class LoginController {
    private UsersApplication usersApplication;

    @Autowired
    public LoginController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }

    /*
    @PostMapping
    public User checkUser(@RequestParam String email, @RequestParam String password){
        return usersApplication.getUserByEmailAndPassword(email, password);
    }

     */

    @PostMapping
    public Map<String, Object> check(@RequestParam String email, @RequestParam String password){
        Map<String, Object> map = new HashMap<>(3);
        if (!(usersApplication.getUserByEmailAndPassword(email, password) == null)){
            map.put("status", true);
            map.put("user", usersApplication.getUserByEmailAndPassword(email, password));
            return map;
        }
        else{
            map.put("status", false);
            return map;
        }
    }


}
