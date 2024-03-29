package com.xuezhi.check_service.adapter.out;

import com.xuezhi.check_service.domain.entity.Verification;
import com.xuezhi.check_service.domain.repository.VerificationRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component
@Repository
public class VerificationRepositoryImpl implements VerificationRepository {
    @Autowired
    private VerificationRepositor verificationRepositor;

    public void addVerification(String userId, MultipartFile multipartFile, String intention,String remark){
        Verification verification = new Verification();
        verification.setUserId(userId);
        verification.setIntention(intention);
        verification.setRemark(remark);
        try {
            verification.setVerImage(new Binary(multipartFile.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        verificationRepositor.save(verification);
    }

    public List<Verification> getVerification(){
        return verificationRepositor.findAll();
    }

    public void deleteVerification(String id){
        verificationRepositor.deleteVerificationById(id);
    }

    public Verification getVerificationById(String id){
        return verificationRepositor.findVerificationById(id);
    }
}
