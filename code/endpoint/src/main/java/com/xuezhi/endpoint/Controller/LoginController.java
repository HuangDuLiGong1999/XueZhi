package com.xuezhi.endpoint.Controller;


import com.xuezhi.endpoint.Repository.UserRepository;
import com.xuezhi.endpoint.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    JavaMailSender jms;
    @Autowired
    private UserService userService;
    @PostMapping(value="/check")
    public boolean checkUser(HttpServletRequest request, HttpServletResponse response){
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        return userService.login(email, password);
    }

    //@PostMapping(value="/register")

    /*
    @PostMapping(value="/mail")
    public String checkMail(HttpServletRequest request){
        String email = request.getParameter("remail");
        User user = userRepository.findByEmail(email);
        if (null == user){
            return "This email has already been registered!";
        }
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("1073130610@qq.com");
        mailMessage.setTo(email);
    }
    */
}
