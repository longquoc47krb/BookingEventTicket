package com.hcmute.bookingevent.config;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hcmute.bookingevent.utils.ImageUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.io.IOException;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public CommonsMultipartResolver commonsMultipartResolver(){
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("UTF-8");
        return resolver;
    }

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dipedzg4p",
                "api_key", "372629287772691",
                "api_secret", "MR81jdHAC21aig5t4p4XfuMvmZU",
                "secure",true
        ));
    }

    public String getPublicId(String urlImage){
        int temp1 = urlImage.lastIndexOf(".");
        int temp2 = urlImage.lastIndexOf("/");
        return urlImage.substring(temp2+1,temp1);
    }

    public String uploadImage(MultipartFile file, String urlDestroy) throws IOException {
        Map params = ObjectUtils.asMap(
                "resource_type", "auto",
                "folder", "fashion"
        );
        Map map = cloudinary().uploader().upload(ImageUtils.convertMultiPartToFile(file),params);
        if (urlDestroy!= null && urlDestroy.startsWith("https://res.cloudinary.com/dmlt1eshx/image/upload")) {
            deleteImage(urlDestroy);
        }
        ImageUtils.deleteMultipartFile(ImageUtils.convertMultiPartToFile(file));
        return map.get("secure_url").toString();
    }

    public void deleteImage(String urlImage) throws IOException {
        cloudinary().uploader().destroy("booking/" + getPublicId(urlImage)
                , ObjectUtils.asMap("resource_type", "image"));
    }
}
