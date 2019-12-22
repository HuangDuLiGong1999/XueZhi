package com.xuezhi.user.adapter.output;

import com.xuezhi.user.domain.entity.History;
import com.xuezhi.user.domain.entity.User;
import com.xuezhi.user.domain.repository.UserRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Component
@Repository
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private UserRepositor userRepositor;

    @Override
    public void addUser(String email, String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName("");
        user.setSex("");
        user.setTelephone("");
        user.setUniversity("public");
        user.setSignature("");
        userRepositor.save(user);
    }

    @Override
    public User getUserById(String id){
        return userRepositor.findUserById(id);
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password){
        return userRepositor.findUserByEmailAndPassword(email, password);
    }

    @Override
    public void updateUser(String id, String name, int age, String sex, String signature){
        User user = userRepositor.findUserById(id);
        user.setName(name);
        user.setAge(age);
        user.setSex(sex);
        user.setSignature(signature);
        userRepositor.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepositor.findByEmail(email);
    }

    @Override
    public void setAvatar(String id, MultipartFile multipartFile){
        User user = userRepositor.findUserById(id);
        //todo
        try {
            user.setAvatar(new Binary(multipartFile.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        userRepositor.save(user);
    }

    @Override
    public Binary getAvatar(String id){
        User user = userRepositor.findUserById(id);
        return user.getAvatar();
    }


    @Override
    public void modifyPassword(String id, String password){
        User user = userRepositor.findUserById(id);
        user.setPassword(password);
        userRepositor.save(user);
    }

    public void updateHistory(String id, String questionId){
        User user = userRepositor.findUserById(id);
        List<History> historyList = user.getHistoryList();
        update(historyList, questionId);
        user.setHistoryList(historyList);
        userRepositor.save(user);
    }

    private void update(List<History> historyList, String questionId)
    {
        if(historyList.size() == 0)
        {
            History temp = new History();
            temp.setId(questionId);
            temp.setTime(new Date().getTime());
            historyList.add(temp);
        }
        else if(historyList.size()<5)
        {
            for(int i = 0; i < historyList.size();i++)
            {
                if(historyList.get(i).getId().equals(questionId))
                {
                    historyList.get(i).setTime(new Date().getTime());
                    break;
                }

                if(i==historyList.size()-1)
                {
                    History temp = new History();
                    temp.setId(questionId);
                    temp.setTime(new Date().getTime());
                    historyList.add(temp);
                }
            }

            historyList.sort(new Comparator<History>() {
                @Override
                public int compare(History u1, History u2)
                {
                    if(u1.getTime() > u2.getTime())
                    {
                        return -1;
                    }
                    else
                        return 1;
                }
            });
        }
        else
        {


            for(int i = 0; i < historyList.size();i++)
            {

                if(historyList.get(i).getId().equals(questionId))
                {
                    historyList.get(i).setTime(new Date().getTime());
                    break;
                }


                if(i==historyList.size()-1)
                {
                    historyList.remove(0);
                    History temp = new History();
                    temp.setId(questionId);
                    temp.setTime(new Date().getTime());
                    historyList.add(temp);
                }
            }
            historyList.sort(new Comparator<History>() {
                @Override
                public int compare(History u1, History u2)
                {
                    if(u1.getTime() > u2.getTime())
                    {
                        return -1;
                    }
                    else
                        return 1;
                }
            });
        }
    }

    public List<History> getHistory(String id){
        User user = userRepositor.findUserById(id);
        return user.getHistoryList();
    }

    public void addQuestionId(String id, String questionId){
        User user = userRepositor.findUserById(id);
        List<String> questionIdList = user.getQuestionIdList();
        questionIdList.add(questionId);
        user.setQuestionIdList(questionIdList);
        userRepositor.save(user);
    }

    public List<String> getQuestionId(String id){
        User user = userRepositor.findUserById(id);
        return user.getQuestionIdList();
    }

    public void deleteQuestionId(String id, String questionId){
        User user = userRepositor.findUserById(id);
        List<String> questionIdList = user.getQuestionIdList();
        for (String quesId : questionIdList){
            if (quesId.equals(questionId)){
                questionIdList.remove(quesId);
                user.setQuestionIdList(questionIdList);
                userRepositor.save(user);
                break;
            }
        }

    }

    public boolean addFollowListId(String id, String questionId){
        User user = userRepositor.findUserById(id);
        List<String> FollowList = user.getFollowList();
        for(String each : FollowList)
            if(each.equals(questionId))
                return false;
        FollowList.add(questionId);
        user.setFollowList(FollowList);
        userRepositor.save(user);
        return true;
    }

    public List<String> getFollowListId(String id){
        User user = userRepositor.findUserById(id);
        return user.getFollowList();
    }

    public boolean deleteFollowListId(String id, String questionId){
        User user = userRepositor.findUserById(id);
        List<String> FollowList = user.getFollowList();
        for (String quesId : FollowList){
            if (quesId.equals(questionId)){
                FollowList.remove(quesId);
                user.setFollowList(FollowList);
                userRepositor.save(user);
                return true;
            }
        }
        return false;
    }

    public void updateUniversity(String id, String school){
        User user = userRepositor.findUserById(id);
        user.setUniversity(school);
        userRepositor.save(user);
    }
}
