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

    /**
     * Sets the example option value in the injected configuration.
     * 
     * @param value - The new string value to set for the example option
     * 
     * @remarks
     * This setter allows runtime modification of the example option configuration
     * value. It directly updates the exampleOption property within the injected
     * configuration object, making the new value immediately available through
     * both the getter property and the getExampleOption() method.
     * 
     * Note that this setter modifies the injected configuration object in place.
     * If the configuration object is shared across multiple service instances,
     * this change will affect all instances that reference the same configuration.
     * 
     * If no configuration object was injected during service construction
     * (injectedConfig is null or undefined), this setter will throw an error.
     * 
     * @example
     * ```typescript
     * // Set a new configuration value
     * this.exampleService.exampleOption = 'new-value';
     * 
     * // The new value is immediately available
     * console.log(this.exampleService.exampleOption); // 'new-value'
     * console.log(this.exampleService.getExampleOption()); // 'new-value'
     * ```
     * 
     * @throws {TypeError} When attempting to set a property on null or undefined injectedConfig
     * 
     * @see {@link ExampleService.exampleOption} for the corresponding getter property
     * @see {@link ExampleService.getExampleOption} for the method-based accessor
     * 
     * @public
     */
    set exampleOption(value: string) {
        this.injectedConfig.exampleOption = value;
    }


    /**
     * Retrieves the example option value from the injected configuration.
     * 
     * @returns The example option string value from the injected configuration
     * 
     * @remarks
     * This method provides programmatic access to the example option configuration
     * value by calling the exampleOption getter property. It serves as an alternative
     * method-based approach to accessing the configuration value when property
     * access syntax is not preferred or not available.
     * 
     * The method delegates to the exampleOption getter, so it has the same behavior:
     * if no configuration was provided during service construction or if the
     * exampleOption property doesn't exist in the configuration, this method may
     * return undefined.
     * 
     * @example
     * ```typescript
     * const configValue = this.exampleService.getExampleOption();
     * if (configValue) {
     *   console.log('Configuration value:', configValue);
     * } else {
     *   console.log('No configuration value available');
     * }
     * ```
     * 
     * @see {@link ExampleService.exampleOption} for the underlying getter property
     * @see {@link ConfigurationToken} for configuration injection setup
     * 
     * @public
     */
    getExampleOption(): string {
        return this.exampleOption;
    }
}
