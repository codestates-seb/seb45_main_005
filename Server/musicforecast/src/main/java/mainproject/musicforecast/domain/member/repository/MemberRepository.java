package mainproject.musicforecast.domain.member.repository;

import mainproject.musicforecast.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Member findByMemberId(Long MemberId);
}