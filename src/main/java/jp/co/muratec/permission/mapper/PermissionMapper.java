package jp.co.muratec.permission.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PermissionMapper {

	List<System> getSystems();
	
	void updateSystemData(@Param("_systems") List<System> systems);
}
