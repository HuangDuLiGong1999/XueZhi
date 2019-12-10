package com.xuezhi.user.domain.repository;

import com.xuezhi.user.domain.entity.User;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

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
}
