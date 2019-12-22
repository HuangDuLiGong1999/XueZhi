package com.xuezhi.user.adapter.input;


import com.xuezhi.user.application.UsersApplication;
import com.xuezhi.user.domain.entity.History;
import com.xuezhi.user.domain.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
//@CrossOrigin
@RequestMapping(value="/users")
public class UserController {

    private UsersApplication usersApplication;

    @Autowired
    public UserController(UsersApplication usersApplication) {
        this.usersApplication = usersApplication;
    }


    @PostMapping
    public boolean addUser(@RequestParam String email, @RequestParam String password){
        usersApplication.addUser(email,password);
        return true;
    }


    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") String id){
        return usersApplication.getUserById(id);
    }

    @PutMapping("/information")
    public boolean updateUser(@RequestParam String id, @RequestParam String name, @RequestParam int age, @RequestParam String sex, @RequestParam String signature){
        usersApplication.updateUser(id, name, age, sex, signature);
        return true;
    }

    @PostMapping("/avatar")
    public boolean setAvatar(@RequestParam String id, @RequestParam MultipartFile multipartFile){
        usersApplication.setAvatar(id, multipartFile);
        return true;
    }

    @GetMapping(value = "/avatar/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] avatar(@PathVariable("id") String id){
        return usersApplication.getAvatar(id);
    }

    @PostMapping("/checkcode")
    public String sendModifyMail(@RequestParam String id) throws IOException {
        return usersApplication.sendModifyMail(id);
    }

    @PutMapping("/password")
    public boolean modifyPassword(@RequestParam String id, @RequestParam String password){
        usersApplication.modifyPassword(id, password);
        return true;
    }

    @PutMapping("/history/{userId}")
    public void updateHistory(@PathVariable("userId") String userId, HttpServletRequest request) throws IOException {
        ServletInputStream servletInputStream = request.getInputStream();
        StringBuilder content = new StringBuilder();
        byte[] b = new byte[request.getContentLength()];
        int lens = -1;
        while ((lens = servletInputStream.read(b)) > 0){
            content.append(new String(b, 0, lens));
        }
        String questionId = content.toString();
        usersApplication.updateHistory(userId, questionId);
    }

    @GetMapping("/history/{userId}")
    public List<History> getHistory(@PathVariable("userId") String id){
        return usersApplication.getHistory(id);
    }

    @PostMapping("/questions")
    public void addQuestionId(@RequestParam String id, @RequestParam String questionId){
        usersApplication.addQuestionId(id, questionId);
    }

    @GetMapping("/questions/{id}")
    public List<String> getQuestionId(@PathVariable(value = "id") String id){
        return usersApplication.getQuestionId(id);
    }

    @DeleteMapping("/questions")
    public void deleteQuestionId(@RequestParam String id, @RequestParam String questionId){
        usersApplication.deleteQuestionId(id, questionId);
    }

    @PostMapping("/followList")
    public boolean addFollowQuestionId(@RequestParam String id, @RequestParam String questionId){
        return usersApplication.addFollowListId(id, questionId);
    }

    @GetMapping("/followList/{id}")
    public List<String> getFollowQuestionId(@PathVariable(value = "id") String id){
        return usersApplication.getFollowListId(id);
    }

    @DeleteMapping("/followList/{id}/{questionId}")
    public boolean deleteFollowQuestionId(@PathVariable(value = "id") String id, @PathVariable(value = "questionId") String questionId){
        return usersApplication.deleteFollowListId(id, questionId);
    }

    @PutMapping("/verification")
    public void updateSchool(@RequestParam String id, @RequestParam String school){
        usersApplication.updateSchool(id, school);
    }
}
