package com.xuezhi.endpoint.Controller;

import com.xuezhi.endpoint.Repository.UserRepository;
import com.xuezhi.endpoint.Service.MailService;
import com.xuezhi.endpoint.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import java.util.Random;

@RestController
@RequestMapping(value="/register")
public class RegisterController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;

    @PostMapping(value="/checkEmail")
    public String checkEmail(HttpServletRequest request){
        String email = request.getParameter("remail");
        if (userRepository.findByEmail(email) == null){
            //添加邮箱验证
            String checkCode = String.valueOf(new Random().nextInt(799999) + 100000);
            String message = "您的注册验证码为："+checkCode;
            try {
                mailService.sendSimpleMail(email, "注册验证码", message);
            }catch (Exception e){
                return "";
            }
            return checkCode;
        }
        else{
            return "failed";
        }
    }

    @PostMapping
    public boolean register(HttpServletRequest request){
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        userService.addUser(email, password);
        return true;
    }

}
