package com.xuezhi.user.application;

import com.xuezhi.user.domain.entity.History;
import com.xuezhi.user.domain.entity.User;
import com.xuezhi.user.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Component
public class UsersApplication {

    private UserRepository userRepository;

    @Autowired
    public UsersApplication(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean addUser(String email, String password){
        if (userRepository.getUserByEmail(email) != null){
            return false;
        }
        userRepository.addUser(email,password);
        return true;
    }

    public void updateUser(String id, String name, int age, String sex, String signature){
        //TODO
        userRepository.updateUser(id, name, age, sex, signature);
    }

    public User getUserById(String id){
        return userRepository.getUserById(id);
    }

    public User getUserByEmailAndPassword(String email, String password){
        return userRepository.getUserByEmailAndPassword(email, password);
    }

    public String checkAndSendMail(String email) throws IOException {
        if(userRepository.getUserByEmail(email)==null) {
            String temp;
            URL restURL = new URL("http://localhost:8083/checkcode/" + email);
            HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
            conn.setRequestMethod("GET"); // POST GET PUT DELETE
            conn.setRequestProperty("Accept", "application/json");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            temp = br.readLine();
            System.out.println(temp);
            return temp;
        }
        else return "fail";
    }

    //todo
    public void setAvatar(String id, MultipartFile multipartFile){
        userRepository.setAvatar(id, multipartFile);
    }

    public byte[] getAvatar(String id){
        return userRepository.getAvatar(id).getData();
    }

    public String sendModifyMail(String id) throws IOException{
        User user = userRepository.getUserById(id);
        String email = user.getEmail();
        URL restURL = new URL("http://localhost:8083/password_checkcode/" + email);
        HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
        conn.setRequestMethod("GET"); // POST GET PUT DELETE
        conn.setRequestProperty("Accept", "application/json");
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String temp = br.readLine();
        System.out.println(temp);
        return temp;
    }

    public void modifyPassword(String id, String password){
        userRepository.modifyPassword(id, password);
    }

    public void updateHistory(String id, String questionId){
        userRepository.updateHistory(id, questionId);
    }

    public List<History> getHistory(String id){
        return userRepository.getHistory(id);
    }

    public void addQuestionId(String id, String questionId){
        userRepository.addQuestionId(id, questionId);
    }

    public List<String> getQuestionId(String id){
        return userRepository.getQuestionId(id);
    }

    public void deleteQuestionId(String id, String questionId){
        userRepository.deleteQuestionId(id, questionId);
    }

    public boolean addFollowListId(String id, String questionId){
        return userRepository.addFollowListId(id, questionId);
    }

    public List<String> getFollowListId(String id){
        return userRepository.getFollowListId(id);
    }

    public boolean deleteFollowListId(String id, String questionId){
        return userRepository.deleteFollowListId(id, questionId);
    }

    public void updateSchool(String id, String school){
        userRepository.updateUniversity(id, school);
    }
}
