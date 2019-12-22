package com.xuezhi.qa_service.application;

import com.xuezhi.qa_service.domain.entity.Answer;
import com.xuezhi.qa_service.domain.entity.Question;
import com.xuezhi.qa_service.domain.repository.QARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.alibaba.fastjson.JSONObject;

import javax.management.ObjectName;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Component
public class QAApplication {
    private QARepository qaRepository;

    private static final int defaultRecommedNum = 4;

    @Autowired
    public QAApplication(QARepository qaRepository){
        this.qaRepository = qaRepository;
    }

    public Question getQuestionByQuestionId(String questionId){

        return qaRepository.getQuestionByQuestionId(questionId);
    }

    public List<Map<String, String>> getQuestionByAskerId(String askerId){
        List<Question> questionList = qaRepository.getQuestionByAskerId(askerId);
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Question question : questionList){
            Map<String, String> map = new HashMap<>();
            map.put("questionId", question.getQuestionId());
            map.put("title", question.getTitle());
            resultList.add(map);
        }
        return resultList;
    }

    public void addQuestion(String title, String description, String askerId, String school){
        qaRepository.addQuestion(title, description, askerId, school);
    }

    public void updateQuestion(String questionId, String title, String description){
        qaRepository.updateQuestion(questionId, title, description);
    }

    public void deleteQuestion(String questionId){
        qaRepository.deleteQuestion(questionId);
    }

    public void addAnswer(String questionId, String authorId, String description){
        qaRepository.addAnswer(questionId, authorId, description);
    }

    public void updateAnswer(String questionId, String authorId, String description){
        qaRepository.updateAnswer(questionId, authorId, description);
    }

    public void deleteAnswer(String questionId, String authorId){
        qaRepository.deleteAnswer(questionId, authorId);
    }

    public List<Question> getQuestionByRegex(String regex, String school){
        return qaRepository.getQuestionByRegex(regex,school);
    }

    public List<Map<String, Object>> getRecommends(String university) throws IOException {
        List<Question> questionList = qaRepository.getQuestionsBySchool(university);
        List<Map<String, Object>> mapList = new ArrayList<>();

        if (questionList.size() == 0){
            Map<String, Object> map = new HashMap<>();
            map.put("questionId", "null");
            mapList.add(map);
            return mapList;
        }

        Random random = new Random();
        if (questionList.size() <= defaultRecommedNum){
            for (Question question : questionList){
                Map<String, Object> map = new HashMap<>();
                String questionId = question.getQuestionId();
                String title = question.getTitle();
                map.put("questionId", questionId);
                map.put("title", title);
                Answer answer = getRandomAnswer(question);
                if (answer != null){
                    map.put("author", getUserById(answer.getAuthorId()));
                    map.put("answer", answer);
                }
                mapList.add(map);
            }
            return mapList;
        }
        for (int i = 0; i < defaultRecommedNum; i++){
            Map<String, Object> map = new HashMap<>();
            int index = random.nextInt(questionList.size());
            Question question = questionList.get(index);
            String questionId = question.getQuestionId();
            String title = question.getTitle();
            map.put("questionId", questionId);
            map.put("title", title);
            Answer answer = getRandomAnswer(question);
            if (answer != null){
                map.put("author", getUserById(answer.getAuthorId()));
                map.put("answer", answer);
            }
            mapList.add(map);
            questionList.remove(questionList.get(index));
        }
        return mapList;
    }

    private JSONObject getUserById(String authorId) throws IOException {
        URL restURL = new URL("http://localhost:8081/users/" + authorId);
        HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
        conn.setRequestMethod("GET"); // POST GET PUT DELETE
        conn.setRequestProperty("Accept", "application/json");
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String temp = br.readLine();
        return JSONObject.parseObject(temp);
    }

    public void updateHistory(String questionId, String userId) throws IOException {
        URL restURL = new URL("http://localhost:8081/users/history/" + userId);
        HttpURLConnection conn = (HttpURLConnection)restURL.openConnection();
        conn.setRequestMethod("PUT");
        conn.setRequestProperty("Content-Type", " application/json");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        PrintWriter printWriter = new PrintWriter(conn.getOutputStream());
        printWriter.write(questionId);
        printWriter.flush();
        printWriter.close();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    }

    public void updateLikes(String questionId, String authorId, String likeUserId){
        qaRepository.updateLikes(questionId, authorId, likeUserId);
    }

    public void addComment(String questionId, String authorId, String commentatorId, String description){
        qaRepository.addComment(questionId, authorId, commentatorId, description);
    }

    private Answer getRandomAnswer(Question question){
        List<Answer> answerList = question.getAnswerList();
        if (answerList.size() == 0){
            return null;
        }
        else {
            Random random = new Random();
            int index = random.nextInt(answerList.size());
            return answerList.get(index);
        }
    }

    public List<String> getAllSchoolList()
    {
        return qaRepository.getSchoolList();
    }
}
