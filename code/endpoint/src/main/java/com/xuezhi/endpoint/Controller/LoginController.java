package com.xuezhi.endpoint.Controller;


import com.xuezhi.endpoint.Repository.UserRepository;
import com.xuezhi.endpoint.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @PostMapping(value="/check")
    public boolean checkUser(HttpServletRequest request){
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        return userService.login(email, password);
    }

}
