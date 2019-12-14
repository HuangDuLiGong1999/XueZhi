package com.xuezhi.user.domain.repository;

import com.xuezhi.user.domain.entity.User;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserRepository {
    //添加用户
    void addUser(String email, String password);

    //修改或添加用户信息
    void updateUser(String id, String name, int age, String sex, String signature);


    User getUserById(String id);

    User getUserByEmailAndPassword(String email, String password);

    User getUserByEmail(String email);

    //设置头像
    //todo
    void setAvatar(String id, MultipartFile multipartFile);

    //显示头像
    Binary getAvatar(String id);

    //上传证件照
    void verify(String id, MultipartFile multipartFile);

    //修改密码
    void modifyPassword(String id, String password);

    //修改浏览历史
    void updateHistory(String id, String questionId);

    //添加用户回答的问题
    void addQuestionId(String id, String questionId);

    //查找用户回答的所有问题id
    List<String> getQuestionId(String id);

    //删除用户的一个回答的问题的id
    void deleteQuestionId(String id, String questionId);
}
