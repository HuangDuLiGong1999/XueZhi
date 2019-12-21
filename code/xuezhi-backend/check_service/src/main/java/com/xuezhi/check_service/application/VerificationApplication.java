package com.xuezhi.check_service.application;

import com.xuezhi.check_service.domain.entity.Verification;
import com.xuezhi.check_service.domain.repository.VerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class VerificationApplication {
    private VerificationRepository verificationRepository;

    @Autowired
    public VerificationApplication(VerificationRepository verificationRepository){
        this.verificationRepository = verificationRepository;
    }

    public void addVerification(String userId, MultipartFile multipartFile, String intention,String remark){
        verificationRepository.addVerification(userId, multipartFile,intention,remark);
    }

    public List<Map<String, Object>> getVerification(){
        List<Verification> verificationList = verificationRepository.getVerification();
        List<Map<String, Object>> mapList = new ArrayList<>();
        for (Verification verification : verificationList){
            Map<String, Object> map = new HashMap<>();
            map.put("id", verification.getId());
            map.put("userId", verification.getUserId());
            map.put("intention", verification.getIntention());
            map.put("remark", verification.getRemark());
            mapList.add(map);
        }
        return mapList;
    }

    public byte[] getVerImage(String id){
        Verification verification = verificationRepository.getVerificationById(id);
        return verification.getVerImage().getData();
    }

    public void deleteVerification(String id){
        verificationRepository.deleteVerification(id);
    }
}
