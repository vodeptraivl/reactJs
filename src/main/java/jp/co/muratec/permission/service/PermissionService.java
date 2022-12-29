package jp.co.muratec.permission.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import jp.co.muratec.permission.mapper.PermissionMapper;

@Service
public class PermissionService {

	@Autowired
	PermissionMapper mapper;
	
	@Autowired
	PlatformTransactionManager txManager;
	
	private final PlatformTransactionManager transactionManager;

	@Value("${root-folder}")
	String ROOTFOLDER;

//	TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
//	try {
//		transactionManager.commit(txStatus);
//	}catch(Exception e){
//		transactionManager.rollback(txStatus);
//		throw e;
//	}
	
	public PermissionService(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}
	
	public List<System> getSystem(){
		return mapper.getSystems();
	}
	
	public void updateSystemData(List<System> systems) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			mapper.updateSystemData(systems);
		}catch(Exception e){
			transactionManager.rollback(txStatus);
			throw e;
		}
		
	}

	public List<jp.co.muratec.permission.domain.System> getTomcatSystems(){
		List<jp.co.muratec.permission.domain.System> tomcatSystem = new ArrayList<jp.co.muratec.permission.domain.System>();
		File directoryPath = new File(ROOTFOLDER);
		if(directoryPath!= null) {
			File filesList[] = directoryPath.listFiles();
			for(File file : filesList) {
				jp.co.muratec.permission.domain.System system = new jp.co.muratec.permission.domain.System();
		 		if(file.getName().equalsIgnoreCase("ROOT")){
				}else{
					system.setSsystemNm(file.getName());
					tomcatSystem.add(system);
				}
		 		
			}	
		}
		
		return tomcatSystem;
	}
	
	
	// BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
	
	// public String enryptPassword(String password) {
	// 	String pwdSHA256 = DigestUtils.sha256Hex(password);
	// 	return bcrypt.encode(pwdSHA256);
	// }
}
