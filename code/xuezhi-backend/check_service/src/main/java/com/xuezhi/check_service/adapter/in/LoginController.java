package com.xuezhi.check_service.adapter.in;


import com.xuezhi.check_service.application.AdministratorApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {
    private AdministratorApplication administratorApplication;

    @Autowired
    public LoginController(AdministratorApplication administratorApplication){
        this.administratorApplication = administratorApplication;
    }

    @PostMapping("/administrators/login")
    public Map<String, Object> check(@RequestParam String name, @RequestParam String password){
        Map<String, Object> map = new HashMap<>();
        if (!(administratorApplication.getAdministrator(name, password) == null)){
            map.put("status", true);
            map.put("school", "root");
        }
        else {
            map.put("status", false);
        }
        return map;
    }
}
