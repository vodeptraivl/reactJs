package jp.co.muratec;

public class CollaboConst {

	
	/*
	 * ※ToDo 改修予定？ エラーメッセージは一時的にConst値で管理する。
	 */

	public static final String CATEGORY_ID_CTB = "CKU_AUTHKNR";
	public static final String SSYSTEM_ID_CTB = "CKU";
	public static final String ERR_MSG_EN_AUTHENTICATION_ERROR = "Authentication error"; // 認証失敗(英語)
	public static final String REGEX = "^(\\d{4})([0-9])(\\d*?)([0-9]\\d?)$";	
	public static final String TEMPLATE_XLSX_FILE_PATH_JP = "classpath:static/excelTemplate/template_jp.xlsx";
	public static final String TEMPLATE_XLSX_FILE_PATH_EN = "classpath:static/excelTemplate/template_en.xlsx";
	
	public interface language{
		public static final String LANG_JP = "ja";

		public static final String LANG_US = "en";
	}
}
