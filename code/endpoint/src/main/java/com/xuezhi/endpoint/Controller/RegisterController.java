package com.xuezhi.endpoint.Controller;

import com.xuezhi.endpoint.Repository.UserRepository;
import com.xuezhi.endpoint.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value="/register")
public class RegisterController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @PostMapping(value="/checkEmail")
    public boolean checkEmail(HttpServletRequest request){
        String email = request.getParameter("remail");
        if (userRepository.findByEmail(email) == null){
            return true;
        }
        else{
            return false;
        }
    }

    /*
    @PostMapping
    public boolean register(HttpServletRequest request){
        String email = request.getParameter("email");
        String password = request.getParameter("password");

    }
    */
}
