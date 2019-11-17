package com.xuezhi.user.application;

import com.xuezhi.user.domain.entity.User;
import com.xuezhi.user.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Component
public class UsersApplication {

    private UserRepository userRepository;

    @Autowired
    public UsersApplication(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    public void addUser(String email, String password){
        userRepository.addUser(email,password);
    }

    public void updateUser(String id, String name, int age, String sex, String signature){
        //TODO
        userRepository.updateUser(id, name, age, sex, signature);
    }

    public User getUserById(String id){
        return userRepository.getUserById(id);
    }

    public boolean getUserByEmailAndPassword(String email, String password){

        return !(userRepository.getUserByEmailAndPassword(email, password) == null);
    }

    public String checkAndSendMail(String email) throws IOException {
        if(userRepository.getUserByEmail(email)==null) {
            String temp;    //todo email service

            URL restURL = new URL("http://localhost:8083/getCheckCode"+"?email="+email);
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
}
