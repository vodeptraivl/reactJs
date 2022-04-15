package jp.co.muratec;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonPropertyOrder({ "statusCd", "result" })
public class ApiResponseDomain<T> extends ApiResponse {
	@JsonProperty("data")
	private T result;
}
