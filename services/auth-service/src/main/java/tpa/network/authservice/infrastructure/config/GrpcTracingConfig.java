package tpa.network.authservice.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.grpc.ClientInterceptor;
import io.grpc.ServerInterceptor;
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.instrumentation.grpc.v1_6.GrpcTelemetry;
import net.devh.boot.grpc.client.interceptor.GrpcGlobalClientInterceptor;
import net.devh.boot.grpc.server.interceptor.GrpcGlobalServerInterceptor;

@Configuration
public class GrpcTracingConfig {

    @Bean
    public GrpcTelemetry grpcTelemetry(OpenTelemetry openTelemetry) {
        return GrpcTelemetry.create(openTelemetry);
    }

    @Bean
    @GrpcGlobalClientInterceptor
    public ClientInterceptor grpcClientTracingInterceptor(GrpcTelemetry grpcTelemetry) {
        return grpcTelemetry.newClientInterceptor();
    }

    @Bean
    @GrpcGlobalServerInterceptor
    public ServerInterceptor grpcServerTracingInterceptor(GrpcTelemetry grpcTelemetry) {
        return grpcTelemetry.newServerInterceptor();
    }
}
