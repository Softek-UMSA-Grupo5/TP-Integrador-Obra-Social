package controllers;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.softek.g5.entities.ubicacion.dto.UbicacionRequestDto;
import org.softek.g5.entities.ubicacion.dto.UbicacionResponseDto;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;


@QuarkusTest
public class UbicacionControllerTest {

    private static UbicacionResponseDto ubicacionResponseDto;

    @BeforeAll
    public static void setUp() {
        UbicacionRequestDto ubicacionDto = new UbicacionRequestDto();
        ubicacionDto.setCodigo("U0022");
        ubicacionDto.setCiudad("Ciudad1");
        ubicacionDto.setProvincia("Provincia1");
        ubicacionDto.setDireccion("Dirección1");
        ubicacionDto.setAltura(123);

        try {
            ubicacionResponseDto = given()
                .contentType(ContentType.JSON)
                .body(ubicacionDto)
                .when()
                .post("/ubicaciones")
                .then()
                .statusCode(201)
                .extract()
                .as(UbicacionResponseDto.class);
        } catch (Exception e) {
            e.printStackTrace();
            fail("No se pudo crear la ubicación en el método setUp()");
        }
    }

    @Test
    public void testGetAllUbicacionesEndpoint() {
        given()
          .when().get("/ubicaciones")
          .then()
             .statusCode(200)
             .body("", hasSize(greaterThan(0)));
    }

    @Test
    public void testGetUbicacionByCodigoEndpoint() {
        given()
          .pathParam("codigo", ubicacionResponseDto.getCodigo())
          .when().get("/ubicaciones/{codigo}")
          .then()
             .statusCode(200)
             .body("ciudad", equalTo("Ciudad1"));
    }

    @Test
    public void testCreateUbicacionEndpoint() {
        given()
          .contentType("application/json")
          .body("{\"ciudad\":\"CiudadB\", \"provincia\":\"ProvinciaB\", \"direccion\":\"DireccionB\", \"altura\":456}")
          .when().post("/ubicaciones")
          .then()
             .statusCode(201)
             .body("ciudad", equalTo("CiudadB"));
    }

    @Test
    public void testUpdateUbicacionEndpoint() {
        given()
          .pathParam("codigo", ubicacionResponseDto.getCodigo())
          .contentType("application/json")
          .body("{\"ciudad\":\"CiudadC\", \"provincia\":\"ProvinciaC\", \"direccion\":\"DireccionC\", \"altura\":789}")
          .when().put("/ubicaciones/{codigo}")
          .then()
             .statusCode(200)
             .body("ciudad", equalTo("CiudadC"));
    }

    @Test
    public void testDeleteUbicacionEndpoint() {
    	given()
        .pathParam("codigo", ubicacionResponseDto.getCodigo())
        .when().delete("/ubicaciones/{codigo}")
        .then()
           .statusCode(200);
    	}
    }
