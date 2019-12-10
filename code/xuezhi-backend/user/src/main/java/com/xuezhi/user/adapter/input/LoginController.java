package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.AdministratorApplication;
import com.xuezhi.user.application.UsersApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
//@CrossOrigin
@RequestMapping(value="/login")
public class LoginController {
    private UsersApplication usersApplication;

    private AdministratorApplication administratorApplication;

    @Autowired
    public LoginController(UsersApplication usersApplication, AdministratorApplication administratorApplication) {
        this.usersApplication = usersApplication;
        this.administratorApplication = administratorApplication;
    }

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

    @PostMapping("/administrator")
    public Map<String, Object> checkAdministrator(@RequestParam String name, @RequestParam String password){
        Map<String, Object> map = new HashMap<>(3);
        if (!(administratorApplication.getAdministratorByNameAndPassword(name, password) == null)){
            map.put("status", true);
            map.put("administrator", administratorApplication.getAdministratorByNameAndPassword(name, password));
            return map;
        }
        else {
            map.put("status", false);
            return map;
        }
    }
}
