package com.xuezhi.qa_service.application;

import com.xuezhi.qa_service.domain.entity.Answer;
import com.xuezhi.qa_service.domain.entity.Question;
import com.xuezhi.qa_service.domain.repository.QARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.json.JSONObject;

@Component
public class QAApplication {
    private QARepository qaRepository;

    @Autowired
    public QAApplication(QARepository qaRepository){
        this.qaRepository = qaRepository;
    }

    public Question getQuestionByQuestionId(String questionId){
        return qaRepository.getQuestionByQuestionId(questionId);
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

    public List<Question> getQuestionByRegex(String regex){
        return qaRepository.getQuestionByRegex(regex);
    }

    public List<Map<String, Object>> getRecommends() throws IOException {
        List<Question> questionList = qaRepository.getPublicQuestions();
        List<Map<String, Object>> mapList = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 6; i++){
            int index = random.nextInt(questionList.size() - 1);
            Question question = questionList.get(index);
            while (question.getAnswerList().size() == 0){
                index = random.nextInt(questionList.size() - 1);
                question = questionList.get(index);
            }
            String questionId = question.getQuestionId();
            String title = question.getTitle();
            List<Answer> answerList = question.getAnswerList();
            int answerIndex = random.nextInt(answerList.size() - 1);
            Answer answer = answerList.get(answerIndex);
            Map<String, Object> map = new HashMap<>();
            map.put("questionId", questionId);
            map.put("title", title);
            map.put("author", getUserById(answer.getAuthorId()));
            map.put("answer", answer);
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
        return new JSONObject(temp);
    }

    public void updateLikes(String questionId, String authorId, String likeUserId){
        qaRepository.updateLikes(questionId, authorId, likeUserId);
    }
}
