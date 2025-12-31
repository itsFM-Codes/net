package tpa.network.eventservice.infrastructure.config;

import io.grpc.ClientInterceptor;
import io.grpc.ServerInterceptor;
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.instrumentation.grpc.v1_6.GrpcTelemetry;
import net.devh.boot.grpc.client.interceptor.GrpcGlobalClientInterceptor;
import net.devh.boot.grpc.server.interceptor.GrpcGlobalServerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for OpenTelemetry gRPC instrumentation.
 * This enables automatic trace context propagation for gRPC calls between services.
 */
@Configuration
public class GrpcTracingConfig {

    @Bean
    public GrpcTelemetry grpcTelemetry(OpenTelemetry openTelemetry) {
        return GrpcTelemetry.create(openTelemetry);
    }

    @Bean
    @GrpcGlobalClientInterceptor
    public ClientInterceptor grpcClientInterceptor(GrpcTelemetry grpcTelemetry) {
        return grpcTelemetry.newClientInterceptor();
    }

    @Bean
    @GrpcGlobalServerInterceptor
    public ServerInterceptor grpcServerInterceptor(GrpcTelemetry grpcTelemetry) {
        return grpcTelemetry.newServerInterceptor();
    }
}
