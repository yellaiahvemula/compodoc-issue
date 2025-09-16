/**
 * @fileoverview Example service demonstrating dependency injection patterns
 * 
 * This file contains an example service that uses Angular's dependency injection
 * system with optional token-based injection for flexible configuration management.
 * 
 * @author Example Developer
 * @since 1.0.0
 */

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

/**
 * Injection token for configuration dependency injection.
 * 
 * @remarks
 * This token enables loose coupling between the configuration service and its
 * consumers, allowing for easy testing and configuration customization in
 * different deployment environments. The token supports optional injection
 * to gracefully handle scenarios where custom configuration is not provided.
 * 
 * @example
 * ```typescript
 * providers: [
 *   {
 *     provide: ConfigurationToken,
 *     useValue: { exampleOption: 'custom-value' }
 *   }
 * ]
 * ```
 * 
 * @public
 */
export const ConfigurationToken = new InjectionToken<any>('ConfigurationToken');

/**
 * Example service for application settings management.
 * 
 * @remarks
 * This service demonstrates Angular's dependency injection patterns with optional
 * token-based injection. It provides centralized access to configuration values
 * that can be customized through dependency injection providers.
 * 
 * The service uses the ConfigurationToken to receive configuration objects
 * and provides getter methods for type-safe access to configuration properties.
 * 
 * @example
 * ```typescript
 * constructor(private exampleService: ExampleService) {}
 * ngOnInit() {
 *   const option = this.exampleService.exampleOption;
 *   console.log('Example option:', option);
 * }
 * ```
 * 
 * @example
 * ```typescript
 * @NgModule({
 *   providers: [
 *     ExampleService,
 *     {
 *       provide: ConfigurationToken,
 *       useValue: { exampleOption: 'production-value' }
 *     }
 *   ]
 * })
 * export class AppModule { }
 * ```
 * 
 * @public
 */
@Injectable()
export class ExampleService {

    /**
     * Creates a new instance of ExampleService.
     * 
     * @param injectedConfig - Optional configuration object injected via DI token
     * 
     * @remarks
     * The constructor uses Angular's dependency injection with the @Optional decorator
     * to gracefully handle cases where no configuration is provided. The @Inject
     * decorator specifies the ConfigurationToken for token-based injection.
     * 
     * When configuration is provided, it's stored privately and made available
     * through getter methods. If no configuration is injected, the service
     * will still initialize but may return undefined values.
     * 
     * @example
     * ```typescript
     * // Configuration provided through DI
     * const service = new ExampleService({ exampleOption: 'test-value' });
     * ```
     * 
     * @example
     * ```typescript
     * // No configuration provided (optional injection)
     * const service = new ExampleService(null);
     * ```
     * 
     * @public
     */
    constructor(
        @Optional()
        @Inject(ConfigurationToken)
        private readonly injectedConfig: any,
    ) {
        console.log(this.injectedConfig);
    }

    /**
     * Gets the example option value from the injected configuration.
     * 
     * @returns The example option string value from configuration
     * 
     * @remarks
     * This getter provides access to the 'exampleOption' property from the
     * configuration object that was injected during service construction.
     * 
     * If no configuration was provided or if the exampleOption property
     * doesn't exist in the configuration, this method may return undefined.
     * 
     * @example
     * ```typescript
     * const option = this.configService.exampleOption;
     * if (option) {
     *   console.log('Example option:', option);
     * } else {
     *   console.log('No example option configured');
     * }
     * ```
     * 
     * @see {@link ConfigurationToken} for configuration injection setup
     * 
     * @public
     */
    get exampleOption(): string {
        return this.injectedConfig.exampleOption;
    }
}
