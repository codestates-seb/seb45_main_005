package mainproject.musicforecast.domain.member.auth.kakao.Controller;

import mainproject.musicforecast.domain.member.auth.kakao.Service.KakaoOauthService;
import mainproject.musicforecast.domain.member.auth.kakao.Service.OauthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/oauth")
public class OauthController {
    private final KakaoOauthService kakaoOauthService;
    private final OauthService oauthService;
    public OauthController(KakaoOauthService kakaoOauthService,
                           OauthService oauthService) {
        this.kakaoOauthService = kakaoOauthService;
        this.oauthService = oauthService;
    }

//    @GetMapping("/kakao")
//    public ResponseEntity kakaoCallback(@RequestParam("code") String code) {
//        System.out.println(code);
//        String token = kakaoOauthService.getKakaoAccessToken(code);
//        MultiValueMap map = kakaoOauthService.createKakaoUser(token);
//        String jsonResponse = "nickname : " + map.get("nickname").toString();
//
//        map.remove("nickname");
//
//        HttpHeaders tokenHeader = new HttpHeaders(map);
//
////        String jsonResponse = (String) map.get("nickname");
//
////        map.remove("nickname");
//        //String jsonResponse = "성공";
//        return ResponseEntity.ok().headers(tokenHeader).body(jsonResponse);
//    }

    @PostMapping("/google")
    public ResponseEntity createGoogleToken(@RequestHeader("Authorization") String token) {

        MultiValueMap map = oauthService.createGoogleUser(token);

        HttpHeaders tokenHeader = new HttpHeaders(map);

        return ResponseEntity.ok().headers(tokenHeader).body("");
    }

    @PostMapping("/kakao")
    public ResponseEntity createKakaoToken(@RequestHeader("Authorization") String token) {

        MultiValueMap map = oauthService.createKakaoUser(token);

        HttpHeaders tokenHeader = new HttpHeaders(map);

        return ResponseEntity.ok().headers(tokenHeader).body("");
    }
}
